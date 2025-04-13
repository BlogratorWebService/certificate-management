import { v4 as uuidv4 } from "uuid";

const getCertId = (startDate) => {
    const startDateObj = new Date(startDate);

    const monthShort = startDateObj.toLocaleString("default", { month: "short" }).toUpperCase();
    const uniquePart = uuidv4().split("-")[0].toUpperCase();

    const certificateId = `CERT_${monthShort}_${uniquePart}`;

    return certificateId;
};

export default getCertId;