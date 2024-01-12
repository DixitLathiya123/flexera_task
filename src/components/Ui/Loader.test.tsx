import { render, screen } from '@testing-library/react';
import Loader from './Loader';

test('renders 10 Skeleton elements', () => {
  render(<Loader />);
  
  // Check if there are 10 Skeleton elements
  const skeletonElements = screen.getAllByTestId('skeleton-element');
  expect(skeletonElements).toHaveLength(10);

  // Check if each Skeleton element has the appropriate structure
  skeletonElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});

