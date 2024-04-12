import { atom } from "recoil";

export const fileTree = atom({
  key: "fileTree",
  default: [
    {
      name: "index.html",
      type: "file",
    },
    {
      name: "index.js",
      type: "file",
    },
    {
      name: "index.css",
      type: "file",
    },
    {
      name: "components",
      type: "folder",
      children: [
        {
          name: "login.js",
          type: "file",
        },
        {
          name: "signup.js",
          type: "file",
        },
        {
          name: "ui",
          type: "folder",
          children: [
            {
              name: "button.js",
              type: "file",
            },
          ],
        },
      ],
    },
  ],
});
