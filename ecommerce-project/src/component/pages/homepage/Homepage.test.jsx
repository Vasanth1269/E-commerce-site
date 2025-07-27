import { it, expect, describe, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomePage } from './homepage';
import axios from 'axios';

vi.mock('axios');

describe('Testing homepage components', () => {
  it('testing product correctly working', async () => {
    axios.mockResolvedValueOnce({
      data: [
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          rating: { stars: 4.5, count: 87 },
          priceCents: 1090,
          keywords: ["socks", "sports", "apparel"]
        },
        {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: { stars: 4, count: 127 },
          priceCents: 2095,
          keywords: ["sports", "basketballs"]
        }
      ]
    });

    render(
      <MemoryRouter>
        <HomePage cart={[]} />
      </MemoryRouter>
    );

    const productcontainer = await screen.findAllByTestId('product-container');
    expect(productcontainer.length).toBe(2);

    expect(
      within(productcontainer[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    )
    expect(
      within(productcontainer[1]).getByText('Intermediate Size Basketball')
    )
  });
});
