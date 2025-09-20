interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
        ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
