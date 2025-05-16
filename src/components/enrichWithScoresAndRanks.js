export function enrichWithScoresAndRanks(data) {
    // Step 1: Compute scores and preserve original order
    const scoredData = data.map((item, index) => ({
        ...item,
        score: item.clicks / item.timeLimit,
        originalIndex: index,
    }));

    // Step 2: Assign overall ranks
    const overallRanked = [...scoredData]
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({ ...item, allRank: index + 1 }));

    // Step 3: Assign ranks per time limit
    const withSpecificRanks = overallRanked.map((entry) => {
        const sameLimit = overallRanked.filter(e => e.timeLimit === entry.timeLimit);
        const sorted = [...sameLimit].sort((a, b) => b.score - a.score);
        const rank = sorted.findIndex(e => e.originalIndex === entry.originalIndex) + 1;

        return {
            ...entry,
            [`rank${entry.timeLimit}`]: rank,
        };
    });

    // Step 4: Return in original input order
    return withSpecificRanks.sort((a, b) => a.originalIndex - b.originalIndex);
}
