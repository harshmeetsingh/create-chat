import "./ChatHeader.css";
export const ChatHeader = ({
  title,
  promptCounter,
}: {
  title: string;
  promptCounter: number;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ flex: 1 }}></div>
      <h2 className={"chat-header"} style={{ flex: 1, textAlign: "center" }}>
        {title}
      </h2>
      <h3 className="chat-header-prompt-count">{`Prompts: ${promptCounter}`}</h3>
    </div>
  );
};
