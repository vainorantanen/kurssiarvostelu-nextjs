import React, { useState, useEffect } from 'react';

type NotificationProps = {
    message: string;
    type: 'success' | 'error';
  };

export default function Notification({ message, type }: NotificationProps) {

  const notificationClasses = `p-4 rounded-md shadow-md my-4 text-white font-bold ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-50">
      <div className={notificationClasses}>
        <p>{message}</p>
      </div>
    </div>
  );
};
