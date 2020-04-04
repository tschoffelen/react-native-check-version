import semver from "semver";
import { lookupVersion } from "../lib/utils";

export default async(req, res) => {
    try {
        const data = await lookupVersion(req.query.platform, req.query.bundleId);
        const needsUpdate = semver.lt(req.query.currentVersion, data.version);
        const updateType = needsUpdate ? semver.diff(req.query.currentVersion, data.version) : null;
        res.json(Object.assign({}, req.query, data, { needsUpdate, updateType }));
    } catch (e) {
        res.json({ error: e.message || e });
    }
}
