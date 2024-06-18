import axios from "axios";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  let elename = searchParams.get("elename");
  const apikey = process.env.API_KEY;

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${apikey}&part=snippet&contentDetails&statistics&suggestionsregionCode=IN&id=${elename}&maxResults=10`
    );
    const fileredvideos = data;

    const response = new Response(
      JSON.stringify({ filterdata: fileredvideos }),
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
