export const meta = {
  name: "gameid",
  description: "Check game senderID",
  author: "Liane",
  version: "1.0.1",
  usage: "{prefix}{name}",
  category: "Utilities",
  permissions: [0],
  noPrefix: "both",
  waitingTime: 10,
  requirement: "2.5.0",
  otherNames: ["uid"],
  icon: "🎮",
  noLevelUI: true,
};

export async function entry({ input, output }) {
  output.reply({
    body: `${input.detectID ?? input.senderID}`,
    attachment: await global.utils.getStreamFromURL(
      "https://st3.depositphotos.com/4570119/35986/i/450/depositphotos_359861810-stock-photo-guangzhou-city-square-road-architectural.jpg"
    ),
  });
}
