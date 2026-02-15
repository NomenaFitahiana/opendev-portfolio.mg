/**
 * Service d'upload d'images
 * Gestion de l'upload vers Cloudinary
 */

import cloudinary from '../config/cloudinary'

// Upload une image vers Cloudinary
export async function uploadImage(file: any, folder: string = 'opendev') {
  try {
    // Utiliser cloudinary.uploader.upload()
    // Retourner l'URL de l'image uploadée
  } catch (error) {
    throw new Error('Erreur lors de l\'upload de l\'image')
  }
}

// Supprimer une image de Cloudinary
export async function deleteImage(publicId: string) {
  try {
    // Utiliser cloudinary.uploader.destroy()
  } catch (error) {
    throw new Error('Erreur lors de la suppression de l\'image')
  }
}
