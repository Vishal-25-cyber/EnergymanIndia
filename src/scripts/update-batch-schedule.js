const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/acuity-tutoring';

async function run() {
  await mongoose.connect(uri);
  const teacher = await mongoose.connection.collection('users').findOne({ role: 'TEACHER' });
  if (!teacher) {
    console.log('No teacher found');
    process.exit(0);
  }
  console.log('Found teacher:', teacher.name, teacher._id);
  
  // Assign teacher to all batches
  await mongoose.connection.collection('batches').updateMany(
    {},
    { $addToSet: { assignedTeacherIds: teacher._id } }
  );

  // Set initial weekly schedule on batches if empty
  const defaultSchedule = [
    { day: 'Monday', subject: 'Mathematics', topic: 'Algebra & Real Numbers', startTime: '18:00', endTime: '19:00', teacherId: teacher._id, isEnabled: true },
    { day: 'Tuesday', subject: 'Science', topic: 'Physics: Electricity & Light', startTime: '18:00', endTime: '19:00', teacherId: teacher._id, isEnabled: true },
    { day: 'Wednesday', subject: 'Mathematics', topic: 'Trigonometry & Quadratic Equations', startTime: '18:00', endTime: '19:00', teacherId: teacher._id, isEnabled: true },
    { day: 'Thursday', subject: 'Science', topic: 'Chemistry: Chemical Reactions & Acids', startTime: '18:00', endTime: '19:00', teacherId: teacher._id, isEnabled: true },
    { day: 'Friday', subject: 'English', topic: 'Grammar & Analytical Writing', startTime: '18:00', endTime: '19:00', teacherId: teacher._id, isEnabled: true },
    { day: 'Saturday', subject: 'Social Science', topic: 'History & Democratic Politics', startTime: '18:00', endTime: '19:00', teacherId: teacher._id, isEnabled: true }
  ];

  await mongoose.connection.collection('batches').updateMany(
    { $or: [{ weeklySchedule: { $exists: false } }, { weeklySchedule: { $size: 0 } }] },
    { $set: { weeklySchedule: defaultSchedule } }
  );

  console.log('Successfully updated batches with teacher and editable weekly schedule in MongoDB!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
