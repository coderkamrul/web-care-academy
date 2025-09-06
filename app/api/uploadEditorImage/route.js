import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json(
        { success: 0, error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${image.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await uploadToCloudinary(base64File, 'image');

    // Return in Editor.js format
    return NextResponse.json({
      success: 1,
      file: {
        url: result.secure_url,
        width: result.width,
        height: result.height
      }
    });

  } catch (error) {
    console.error('Editor image upload error:', error);
    return NextResponse.json(
      { success: 0, error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}