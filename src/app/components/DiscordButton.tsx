import React from "react";

const link = process.env.NEXT_PUBLIC_TEMPLATE_DISCORD_LINK;

function DiscordButton() {
  const handleDiscordClick = () => {
    window.open( link, "_blank");
  };

  return (
    <button
      onClick={handleDiscordClick}
      className="bg-themeGreen/80 hover:bg-themeGreen tracking-wider transition-all ease-in duration-300 cursor-pointer hover:scale-[1.04] rounded-full px-4 py-2 text-white text-sm font-Pooppins font-semibold"
    >
      Discord
    </button>
  );
}

export default DiscordButton;