export default function PageHeader({ icon, title, subtitle, children }) {
  return (
    <div className="page-header wc-page-header">
      <div className="wc-page-header__main">
        {icon && <span className="wc-page-icon" aria-hidden="true">{icon}</span>}
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
