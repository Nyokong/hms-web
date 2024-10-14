export default function handler(req, res) {
    const { user_id } = req.body;
    console.log('Received notification for user:', user_id);
    res.status(200).json({ message: 'Notification received' });
}
