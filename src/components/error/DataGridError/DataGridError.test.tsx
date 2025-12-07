import { describe, test, expect, vi, it, } from 'vitest';
import { fireEvent, render, screen, } from '@testing-library/react';
import DataGridError from './DataGridError';

describe('DataGridError', () => {
    test('muestra el mensaje de error', () => {
        render(<DataGridError error={'Error de red'}/>);
        expect(screen.getByText('Error de red')).toBeDefined();
    });

    it('muestra el botón Recargar y ejecuta onClick', () => {
        const handleClick = vi.fn();
        render(<DataGridError error={'Error de red'} onClick={handleClick}/>);
        const button = screen.getByRole('button', { name: /recargar/i });
        expect(button).toBeDefined();
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});