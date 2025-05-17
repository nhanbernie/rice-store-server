import { IContact } from '../../../models/types/contact/contact.type'
import Contact from '../../../models/entities/contacts/contact.entity'
import { CustomError } from '../../../utils/errors/custom-error'

export const updateContactInfo = async (contactData: IContact) => {
  try {
    if (!Array.isArray(contactData.contacts)) {
      throw new CustomError('Contacts must be an array', 400)
    }

    // Validate each contact item
    contactData.contacts.forEach((contact) => {
      if (!contact.type || !contact.link) {
        throw new CustomError('Each contact must have type and link', 400)
      }
    })

    const contact = await Contact.findOneAndUpdate(
      { configId: 'singleton' },
      { contacts: contactData.contacts },
      { new: true, upsert: true, runValidators: true, projection: { contacts: 1, _id: 0 } }
    )

    if (!contact) {
      throw new CustomError('Failed to update contact information', 500)
    }

    return contact.contacts
  } catch (error) {
    if (error instanceof CustomError) {
      throw error
    }
    throw new CustomError('Error updating contact information', 500)
  }
}
