export const CreateLayout = ({ children }) => {
  return (
    <div className="page">
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};