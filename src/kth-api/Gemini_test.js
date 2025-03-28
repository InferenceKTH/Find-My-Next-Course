import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Could you extract the course requirements from the text I will provide later down? I want the return format to be a 2D array with where each element in the array is an array containing the course codes of the courses you only need one of the courses in the array to meet that one requirement? A course code starts with two capital letters and is followed by 4-5 letters or numbers. The data to check: \u003cp\u003eKunskaper och f\u0026#228;rdigheter i Javaprogrammering, 6 hp, motsvarande slutf\u0026#246;rd kurs ID1018/DD1337 alternativt en slutf\u0026#246;rd kurs i grundl\u0026#228;ggande programmering som DD1310-DD1319/DD1321/DD1331/DD100N kombinerad med en slutf\u0026#246;rd kurs i Javaprogrammering motsvarande DD1380.\u003c/p\u003e\u003cp\u003eKunskaper i boolesk algebra, 1,5 hp, motsvarande slutf\u0026#246;rd kurs IE1204/IE1205, alternativt ANN1 i IS1500.\u003c/p\u003e DATA END. Are you sure this is correct?"
  });
  console.log(response.text);
  
}

await main();