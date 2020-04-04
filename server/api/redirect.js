import { lookupVersion } from "../lib/utils";

export default async(req, res) => {
    try {
        const data = await lookupVersion(req.query.platform, req.query.bundleId);
        res.status(302).setHeader("Location", data.url).send(null);
    } catch (e) {
        res.json({ error: e.message || e });
    }
}
