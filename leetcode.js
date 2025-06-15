const usernames = ["IhCGgTqDfB"];
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
        const totalQ = Number(data[0].profile.totalSolved);
        const totalEasy = Number(data[0].profile.easySolved);
        const totalMedium = Number(data[0].profile.mediumSolved);
        const totalHard = Number(data[0].profile.hardSolved);

        // Update numbers in DOM
        document.querySelector(".totalQ").innerHTML = totalQ;
        document.querySelector(".totalEasy").innerHTML = totalEasy;
        document.querySelector(".totalMedium").innerHTML = totalMedium;
        document.querySelector(".totalHard").innerHTML = totalHard;

        // ✅ Move gradient update inside try block
        const easyPercent = (totalEasy / totalQ) * 100;
        const mediumPercent = (totalMedium / totalQ) * 100;
        const hardPercent = 100 - easyPercent - mediumPercent;

        const easyEnd = easyPercent;
        const mediumEnd = easyEnd + mediumPercent;
        const hardEnd = 100;

        const circleElement = document.querySelector(".circle");
        circleElement.style.background = `conic-gradient(
            #00c853 0% ${easyEnd}%,
            #ffd600 ${easyEnd}% ${mediumEnd}%,
            #d50000 ${mediumEnd}% ${hardEnd}%
        )`;

    } catch (error) {
        console.error("Error:", error);
    }
}

// Initial fetch on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchUserData();
});


// Optional: repeat every 5 seconds
// setInterval(fetchUserData, 5000);
