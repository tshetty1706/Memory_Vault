import './BirthdayCount.css'
export default function BirthdayCount({darkMode, birthday}){

    function getDaysUntilBirthday(birthday) {

        if (!birthday) return null;

            const today = new Date();

            const birthDate = new Date(birthday);

            const nextBirthday = new Date(
                today.getFullYear(),
                birthDate.getMonth(),
                birthDate.getDate()
            );

            if (nextBirthday < today) {
                nextBirthday.setFullYear(
                today.getFullYear() + 1
                );
            }

            const difference =
                nextBirthday - today;

            const days = Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );

        return days;
    }

    return(
        <div className="birthday-card">

            <h2>📅 Next Birthday</h2>

            {getDaysUntilBirthday(birthday) !== null ? (
                <p>
                    {getDaysUntilBirthday(birthday) === 0
                    ? `HAPPYYYYY BIRTHDDAYYYYYYYYYYYYY! 🎉🎂`
                    : `${getDaysUntilBirthday(birthday)} Days Left 🎂
                    `}
                </p>
            ) : (
                <p>
                Add your birthdate
                </p>
            )}

        </div>
    )
}