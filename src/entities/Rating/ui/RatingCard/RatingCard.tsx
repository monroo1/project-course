import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";
import { Card } from "@/shared/ui/Card/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
	const {
		className, title, feedbackTitle, hasFeedback, rate = 0, onCancel, onAccept,
	} = props;
	const { t } = useTranslation();
	const [isModalOpen, setIsModalModal] = useState(false);
	const [starsCount, setStarsCount] = useState(rate);
	const [feedback, setFeedback] = useState("");

	const onSelectStars = useCallback((selectedStarsCount: number) => {
		setStarsCount(selectedStarsCount);
		if (hasFeedback) {
			setIsModalModal(true);
		} else {
			onAccept?.(selectedStarsCount);
		}
	}, [hasFeedback, onAccept]);

	const acceptHandle = useCallback(() => {
		setIsModalModal(false);
		onAccept?.(starsCount, feedback);
	}, [starsCount, feedback, onAccept]);

	const cancelHandle = useCallback(() => {
		setIsModalModal(false);
		onCancel?.(starsCount);
	}, [starsCount, onCancel]);

	const modalContent = (
		<>
			<Text title={feedbackTitle} />
			<Input value={feedback} onChange={setFeedback} placeholder={t("ваш отзыв")} />
		</>
	);

	return (
		<Card className={className} max>
			<VStack align="center" gap="8">
				<Text title={starsCount ? t("спасибо за оценку") : title} />
				<StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
			</VStack>
			<BrowserView>
				<Modal isOpen={isModalOpen} lazy>
					<VStack gap="32" max>
						{modalContent}
						<HStack max gap="8" justify="between">
							<Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
								{t("закрыть")}
							</Button>
							<Button onClick={acceptHandle}>
								{t("отправить")}
							</Button>
						</HStack>
					</VStack>
				</Modal>
			</BrowserView>
			<MobileView>
				<Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
					<VStack gap="32">
						{modalContent}
						<Button onClick={acceptHandle} size={ButtonSize.L} fullWidth>
							{t("отправить")}
						</Button>
					</VStack>
				</Drawer>
			</MobileView>
		</Card>
	);
});