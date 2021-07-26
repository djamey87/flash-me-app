import React from 'react';
import {
	Portal,
	Dialog,
	Paragraph,
	Button,
} from 'react-native-paper';

interface Props {
	title?: string;
	body?: string;
	onConfirm: () => void;
	onDismiss: () => void;
}

const ConfirmationDialog: React.FC<Props> = ({
	title,
	body,
	onConfirm,
	onDismiss,
}) => {
	return (
		<Portal>
			<Dialog
				visible={true}
				onDismiss={onDismiss}
				style={{ zIndex: 1000 }}
			>
				{title ? <Dialog.Title>{title}</Dialog.Title> : null}
				{body ? (
					<Dialog.Content>
						<Paragraph>{body}</Paragraph>
					</Dialog.Content>
				) : null}
				<Dialog.Actions>
					<Button onPress={onConfirm}>OK</Button>
					<Button onPress={onDismiss}>Cancel</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default ConfirmationDialog;
