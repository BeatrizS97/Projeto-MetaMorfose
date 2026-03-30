
import cors from '../cors';
import { authenticate } from '../middlewares/authenticate';
import { getAuditLogs } from '../controllers/auditLogController';

// API Route para logs de auditoria
async function handler(req, res) {
  cors(req, res, () => {});
  const userId = req.user.id;
  if (req.method === 'GET') {
    const logs = await getAuditLogs(userId);
    return res.status(200).json(logs);
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default authenticate(handler);
