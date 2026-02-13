export default function MenuItem({ item, onClick }) {
  return (
    <div className="menu-item" onClick={onClick}>
      <span className="status-dot" />
      <span className="item-name">{item}</span>
    </div>
  );
}
