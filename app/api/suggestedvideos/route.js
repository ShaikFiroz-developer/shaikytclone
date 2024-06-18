import axios from "axios";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  let elename = searchParams.get("cid");
  const apikey = process.env.API_KEY;

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apikey}&channelId=${elename}&part=snippet&regionCode=IN&type=video&order=viewCount&videoDuration=long&maxResults=10`
    );

    const response = new Response(JSON.stringify({ data: data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
