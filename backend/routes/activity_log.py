from flask import Blueprint, jsonify, request
from datetime import datetime

from backend.database.init import SessionLocal
from backend.models.activity_log import ActivityLog

activity_log_bp = Blueprint('activity_log', __name__)


@activity_log_bp.route('/activity-log', methods=['GET'])
def list_logs():
    """Return all activity logs."""
    session = SessionLocal()
    try:
        logs = session.query(ActivityLog).all()
        data = [
            {
                'id': log.id,
                'user_id': log.user_id,
                'activity_type': log.activity_type,
                'duration_minutes': log.duration_minutes,
                'calories_burned': log.calories_burned,
                'date': log.date.isoformat(),
            }
            for log in logs
        ]
        return jsonify(data)
    finally:
        session.close()


@activity_log_bp.route('/activity-log', methods=['POST'])
def create_log():
    """Create a new activity log."""
    data = request.get_json() or {}
    user_id = data.get('user_id')
    activity_type = data.get('activity_type')
    duration_minutes = data.get('duration_minutes')
    calories_burned = data.get('calories_burned')
    date_str = data.get('date')

    if (
        user_id is None
        or not activity_type
        or duration_minutes is None
        or calories_burned is None
        or not date_str
    ):
        return jsonify({'error': 'All fields are required'}), 400

    try:
        date = datetime.fromisoformat(date_str).date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use ISO format (YYYY-MM-DD)'}), 400

    session = SessionLocal()
    try:
        log = ActivityLog(
            user_id=user_id,
            activity_type=activity_type,
            duration_minutes=duration_minutes,
            calories_burned=calories_burned,
            date=date,
        )
        session.add(log)
        session.commit()
        return (
            jsonify(
                {
                    'id': log.id,
                    'user_id': log.user_id,
                    'activity_type': log.activity_type,
                    'duration_minutes': log.duration_minutes,
                    'calories_burned': log.calories_burned,
                    'date': log.date.isoformat(),
                }
            ),
            201,
        )
    finally:
        session.close()


@activity_log_bp.route('/activity-log/<int:log_id>', methods=['DELETE'])
def delete_log(log_id: int):
    """Delete an activity log by id."""
    session = SessionLocal()
    try:
        log = session.query(ActivityLog).get(log_id)
        if not log:
            return jsonify({'error': 'Log not found'}), 404

        session.delete(log)
        session.commit()
        return jsonify({'message': 'Log deleted'})
    finally:
        session.close()
