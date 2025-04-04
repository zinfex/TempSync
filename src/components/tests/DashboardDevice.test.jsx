import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardDevice from '../DashboardDevice/DashboardDevice';


describe('DashboardDevice component', () => {
  test('deve renderizar o componente corretamente', () => {
    render(<DashboardDevice />);
    expect(screen.debug())
  });
});
