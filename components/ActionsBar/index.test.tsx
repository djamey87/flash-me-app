import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { fireEvent } from '@testing-library/react-native';
import ActionsBar from '.';

describe('ActionsBar', () => {
	const mockAddClick = jest.fn();

	test('Should call onAddClick when add button is pressed', () => {
		const render = renderer.create(
			<ActionsBar onAddClick={mockAddClick} />,
		);
		const addButton = render.root.findByProps({ testID: 'add-btn' });

		act(() => fireEvent.press(addButton));
		expect(mockAddClick).toBeCalled();
	});
});
