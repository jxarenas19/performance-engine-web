import React from 'react';
import {Card, Col, Row, Skeleton} from 'antd';

const DualTableSkeleton = () => {
    // Ajusta el número de filas según tus necesidades
    const numberOfRows = 5;

    return (
        <Row gutter={16}>
            {/* Dos columnas para las dos tablas */}
            {[...Array(2)].map((_, colIndex) => (
                <Col key={colIndex} span={12}>
                    <Card>
                        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
                            <Skeleton key={rowIndex} loading={true} active>
                                <Skeleton.Input style={{ width: '100%' }} active />
                            </Skeleton>
                        ))}
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default DualTableSkeleton;
