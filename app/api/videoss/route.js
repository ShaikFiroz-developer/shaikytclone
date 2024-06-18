import axios from "axios";

export async function GET(req, res) {
  const apikey = process.env.API_KEY;
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/videoCategories?key=${apikey}&part=snippet&regionCode=IN`
    );
    const categoriesdata = data.items;

    const response = new Response(
      JSON.stringify({ filterdata: categoriesdata }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorResponse = new Response(
      JSON.stringify({ error: "Error fetching data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return errorResponse;
  }
}
