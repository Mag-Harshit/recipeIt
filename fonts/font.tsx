import { Edu_VIC_WA_NT_Beginner, Lora } from "next/font/google";
export const eduVIC = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const Loras = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
