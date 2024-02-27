import {Progress} from 'antd';

const TimeWorked: React.FC<{ hoursWorked: number }> = ({hoursWorked}) => {
    const totalHours = 8;
    const percentage = (hoursWorked / totalHours) * 100;
    const remainingHours = totalHours - hoursWorked;

    return (
        <div className="time-worked">
            <Progress
                percent={percentage}
                strokeColor={percentage < 50 ? '#f5222d' : '#52c41a'}
                status={percentage < 50 ? 'exception' : 'success'}
                format={() => `${hoursWorked} hrs / ${totalHours} hrs`}
            />
            <span className="remaining-hours">
        {remainingHours > 0 && `Faltan ${remainingHours} hrs`}
      </span>
        </div>
    );
};

export default TimeWorked;
