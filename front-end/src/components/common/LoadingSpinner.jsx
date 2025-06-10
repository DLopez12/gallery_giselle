export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-t-4 border-b-4'
  };

  return (
    <div className={`flex justify-center items-center min-h-screen w-full ${className}`}>
      <div
        className={`animate-spin rounded-full border-gray-900 dark:border-gray-100 ${sizeClasses[size]}`}
        aria-label="Loading..."
      />
    </div>
  );
}