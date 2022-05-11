export const FooterItem = ({ content, title }) => {
  return (
    <div className="footerItemContainer">
      <div className="footerItemTitle">{title}</div>
      <div className="footerItemBody">
        {content.map((c, index) => {
          return (
            <div
              className={`footerItemRow ${
                index === content.length - 1 ? "border-b-2" : ""
              }`}
              key={`resource-${index}`}
            >
              {title === "Resources" ? (
                <div className="flex flex-col">
                  <span>Type: {c.type}</span>
                  <span>Quantity: {c.quantity}</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span>Name: {c.name}</span>
                  <span>Specialisation: {c.specialisation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
