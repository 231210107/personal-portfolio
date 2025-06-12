    const usernames = [
        "IhCGgTqDfB"
    ];

    const apiUrl = "https://leetscan.vercel.app/multi";

    async function fetchUserData() {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usernames: usernames }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            const totalQ = data[0].profile.totalSolved;
              
            const totalEasy = data[0].profile.easySolved;
            const totalMedium = data[0].profile.mediumSolved;
            const totalHard = data[0].profile.hardSolved;
            document.querySelector(".totalQ").innerHTML=totalQ;
            document.querySelector(".totalEasy").innerHTML=totalEasy;
            document.querySelector(".totalMedium").innerHTML=totalMedium;
            document.querySelector(".totalHard").innerHTML = totalHard;


            

            console.log(totalQ, totalEasy, totalMedium, totalHard);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Fetch data initially on page load
    fetchUserData();

    // Fetch data every 5 seconds
