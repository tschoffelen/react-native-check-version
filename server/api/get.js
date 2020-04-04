import { lookupVersion } from "../lib/utils";

export default async(req, res) => {
    try {
        const data = await lookupVersion(req.query.platform, req.query.bundleId);
        res.json(Object.assign({}, req.query, data));
    } catch (e) {
        res.json({ error: e.message || e });
    }
}
