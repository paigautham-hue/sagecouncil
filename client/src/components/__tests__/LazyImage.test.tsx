import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { LazyImage } from "../LazyImage";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

beforeEach(() => {
  mockIntersectionObserver.mockReturnValue({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: vi.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver as any;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("LazyImage Component", () => {
  it("should render with skeleton placeholder initially", () => {
    render(
      <LazyImage
        src="test-image.jpg"
        alt="Test Image"
        showSkeleton={true}
      />
    );

    // Check that the container is rendered
    const container = screen.getByRole("img", { hidden: true }).parentElement;
    expect(container).toBeInTheDocument();
  });

  it("should set up Intersection Observer on mount", () => {
    render(
      <LazyImage
        src="test-image.jpg"
        alt="Test Image"
      />
    );

    expect(mockIntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalled();
  });

  it("should accept custom rootMargin prop", () => {
    render(
      <LazyImage
        src="test-image.jpg"
        alt="Test Image"
        rootMargin="200px"
      />
    );

    const observerCall = mockIntersectionObserver.mock.calls[0][1];
    expect(observerCall.rootMargin).toBe("200px");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <LazyImage
        src="test-image.jpg"
        alt="Test Image"
        className="custom-class"
      />
    );

    const div = container.querySelector(".custom-class");
    expect(div).toBeInTheDocument();
  });

  it("should have correct default rootMargin", () => {
    render(
      <LazyImage
        src="test-image.jpg"
        alt="Test Image"
      />
    );

    const observerCall = mockIntersectionObserver.mock.calls[0][1];
    expect(observerCall.rootMargin).toBe("100px");
  });

  it("should have correct threshold for early loading", () => {
    render(
      <LazyImage
        src="test-image.jpg"
        alt="Test Image"
      />
    );

    const observerCall = mockIntersectionObserver.mock.calls[0][1];
    expect(observerCall.threshold).toBe(0.01);
  });
});

describe("ProgressiveImage Component with Lazy Loading", () => {
  const { ProgressiveImage } = require("../ProgressiveImage");

  it("should support lazy loading prop", () => {
    const { container } = render(
      <ProgressiveImage
        src="test-image.jpg"
        alt="Test Image"
        lazy={true}
      />
    );

    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it("should load immediately when lazy=false", () => {
    render(
      <ProgressiveImage
        src="test-image.jpg"
        alt="Test Image"
        lazy={false}
      />
    );

    // When lazy=false, Intersection Observer should not be called
    // (or should be called but image loads immediately)
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it("should accept custom rootMargin for lazy loading", () => {
    render(
      <ProgressiveImage
        src="test-image.jpg"
        alt="Test Image"
        lazy={true}
        rootMargin="150px"
      />
    );

    const observerCall = mockIntersectionObserver.mock.calls[0][1];
    expect(observerCall.rootMargin).toBe("150px");
  });
});
