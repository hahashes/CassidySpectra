import { UNIRedux } from "../modules/unisym.js";

export const meta = {
  name: "start",
  author: "Liane Cagara",
  description:
    "Acts as a central hub, like a Start Menu, providing users with an overview of available commands, their functionalities, and access to specific command details. Helps users quickly navigate the bot's features.",
  version: "2.5.0",
  usage: "{prefix}{name} [commandName]",
  category: "System",
  permissions: [0],
  requirement: "2.5.0",
};

export async function entry({ input, output, commands, prefix, threadConfig }) {
  const args = input.arguments;
  const { logo: icon } = global.Cassidy;

  if (args.length > 0) {
    const commandName = args[0];
    const command = commands[commandName];

    if (command) {
      let {
        name,
        author,
        description,
        otherNames,
        usage,
        category,
        permissions,
        waitingTime,
      } = command.meta;
      output.reply(
        `╭─────────────❍
│  **Command**: ${name}
│  **Description**: ${description}
│  **Aliases**: ${otherNames?.join ? otherNames.join(", ") : "None"}
│  **Usage**: ${usage?.replace(/{prefix}/g, prefix)?.replace(/{name}/g, name)}
│  **Category**: ${category?.toUpperCase() || "NO CATEGORY"}
│  **Permissions**: ${
          permissions.join ? permissions.join(", ") : "No permissions required"
        }
│  **Cooldown**: ${waitingTime || 5} seconds
│  **Author**: ${author || "No author"}
├────────⬤
│  ${UNIRedux.redux} v${global.package.version}
╰─────────────❍`
      );
    } else {
      output.reply(
        `${icon}\n\n❌ The command "${commandName}" does not exist in the help list.`
      );
    }
  } else {
    const categories = {};
    const names = [];

    for (const commandName in commands) {
      const { meta } = commands[commandName];
      if (names.includes(meta.name)) {
        continue;
      }
      names.push(meta.name);
      const category = meta.category?.toUpperCase() || "NO CATEGORY";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(meta);
    }

    const sortedCategories = Object.keys(categories).sort();
    const helpList = sortedCategories.map((category) => {
      const commands = categories[category]
        .map((command) => {
          const { name, description } = command;
          return `├──⬤ 📄 ${prefix}**${name}** - ${
            description || "No description available."
          }`;
        })
        .join("\n");
      return `├⬤ 📁 **${category}**\n${commands}`;
    });

    output.reply(`${icon}
╭─────────────❍
${helpList.join("\n│ \n")}
├────────⬤
│  ${UNIRedux.redux} v${global.package.version}
╰─────────────❍
 » CassidyRedux currently has ${names.length} commands.
 » Developed by @**Liane Cagara** 🎀`);
  }
}
