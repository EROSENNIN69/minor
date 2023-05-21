export const tabInfo = ["description", "addditional Information", "location", "review and ratings", "seller info"];

export const loginInitialValues = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  profile: "",
}

export const roomOptions = [1,2,3, 4, 5, 6, 7, 8, 9, 10, 11];

export const categoryOptions = ["house", "apartment", "shutter", "room"];

export const propertyFacing = ["east", "west", "north", "south"];

export const propertyFor = ["for rent", "for sale"];

export const priceOptions = ["asc", "desc"];

export const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeInOut"
    }
  }
};

export const navVariants = {
  hidden: {
    opacity: 1
  },
  visible: {
    opacity: 1
  }
}

export const sidebarVariants = {
  hidden: {
    opacity: 0,
    x: 100
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  }
};