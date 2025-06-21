from datetime import date


def calculate_calories(user):
    """Calculate daily calorie need using Mifflin-St Jeor formula."""
    if user.birthdate is None:
        raise ValueError("user.birthdate must be provided")

    today = date.today()
    age = today.year - user.birthdate.year - (
        (today.month, today.day) < (user.birthdate.month, user.birthdate.day)
    )

    if user.gender and user.gender.lower() in {"male", "m", "erkek"}:
        calories = 10 * user.weight + 6.25 * user.height - 5 * age + 5
    else:
        calories = 10 * user.weight + 6.25 * user.height - 5 * age - 161

    return int(calories)
