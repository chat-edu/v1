import React from 'react';

const ChatEduFooter = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                gap: 16,
                marginTop: 'auto',
            }}
        >
            <h1
                style={{
                    fontSize: 60,
                    color: '#000000',
                    margin: 0,
                    fontFamily: 'SF Pro Black',
                }}
            >
                Chat<span style={{color: '#4caf50'}}>EDU</span>
            </h1>
            <img
                src={'https://www.chatedu.tech/logo.png'}
                alt={'ChatEDU Logo'}
                style={{
                    width: 150,
                    height: 150,
                }}
            />
        </div>
    );
};

export default ChatEduFooter;
