function editDistanceRecursion(correct, answer, remainder) {
    if (answer == '') return correct.length;
    if (correct == '') return answer.length;
    if (answer.charAt(0) != correct.charAt(0)) {
        if (remainder < 0) return Infinity;
        let del = 1 + editDistanceRecursion(correct.slice(1), answer, remainder - 1);
        let ins = 1 + editDistanceRecursion(correct, answer.slice(1), remainder - 1);
        let rep = 1 + editDistanceRecursion(correct.slice(1), answer.slice(1), remainder - 1);
        return Math.min(del, ins, rep);
    }
    return editDistanceRecursion(correct.slice(1), answer.slice(1), remainder);
}

module.exports = (correct, answer, maxEditDistance = 0) => {
    if (Array.isArray(correct)) {
        for (let i = 0; i < correct.length; i++) {
            correct = '' + correct;
            answer = '' + answer;
            correct = correct.trim().toLowerCase();
            answer = answer.trim().toLowerCase();
            if (editDistanceRecursion(correct[i], answer, maxEditDistance) <= maxEditDistance) return true;
        }
        return false;
    } else {
        correct = correct.trim().toLowerCase();
        answer = answer.trim().toLowerCase();
        const kd = editDistanceRecursion(correct, answer, maxEditDistance);
        return kd <= maxEditDistance;
    }
};