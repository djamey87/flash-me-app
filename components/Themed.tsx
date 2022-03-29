import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import {
	Text as DefaultText,
	View as DefaultView,
} from 'react-native';
import { IconButton as PaperIconButton } from 'react-native-paper';

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];
interface ButtonProps {
	onPress: () => void;
	icon: string;
}

export function Text(props: TextProps) {
	const { style, ...otherProps } = props;
	const { colors } = useTheme();

	return (
		<DefaultText
			style={[{ color: colors.text }, style]}
			{...otherProps}
		/>
	);
}

export function View(props: ViewProps) {
	const { style, ...otherProps } = props;
	const { colors } = useTheme();

	return (
		<DefaultView
			style={[{ backgroundColor: colors.background }, style]}
			{...otherProps}
		/>
	);
}

export function IconButton({ onPress, icon }: ButtonProps) {
	const { colors } = useTheme();

	return (
		<PaperIconButton
			icon={icon}
			size={50}
			color={colors.text}
			onPress={onPress}
		/>
	);
}
