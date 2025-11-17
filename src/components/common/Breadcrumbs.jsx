import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ trail }) => (
  <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
    {trail.map((item, index) => (
      <React.Fragment key={item.href ?? item.label}>
        {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-gray-300" />}
        {item.href ? (
          <Link to={item.href} className="font-medium text-gray-600 hover:text-navy-600">
            {item.label}
          </Link>
        ) : (
          <span className="font-semibold text-gray-900">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export default Breadcrumbs;

