interface AlertProps {
  errorsArr: (string | JSX.Element)[];
  alertType: 'warning' | 'danger';
  tagStrong?: string;
};

export default function Alert({errorsArr, alertType, tagStrong}: AlertProps) {
  return (
    <div className={`alert alert-${alertType} py-3 px-2`}>
      {errorsArr.map((err, id) => <p key={id} className="m-0" role="alert">
        {tagStrong ? <strong>{tagStrong}: </strong> : ''}
        {err}
      </p>)}
    </div>
  );
};
