import json

FILE = "channel.json"

def load_data():
    try:
        with open(FILE, "r") as f:
            return json.load(f)
    except:
        return []

def save_data(data):
    with open(FILE, "w") as f:
        json.dump(data, f, indent=4)

def list_channels(data):
    print("\nChannels inside:", len(data))
    print("-" * 30)
    for i, ch in enumerate(data, start=1):
        print(f"{i}. {ch['title']}")
        print(f"   URL: {ch['url']}")
        print(f"   Cover: {ch['cover']}")
        print(f"   Release: {ch['release']}")
        print()

def add_channel(data):
    print("\nAdd New Channel")

    title = input("Title: ")
    url = input("URL: ")
    cover = input("Cover URL: ")
    release = input("Release Date: ")

    new_channel = {
        "title": title,
        "url": url,
        "cover": cover,
        "release": release
    }

    data.append(new_channel)
    save_data(data)
    print("Channel added.")

def delete_channel(data):
    list_channels(data)

    try:
        num = int(input("Enter number to delete: "))
        removed = data.pop(num - 1)
        save_data(data)
        print("Deleted:", removed["title"])
    except:
        print("Invalid number.")

def main():
    while True:
        data = load_data()

        print("\n=== Channel Manager ===")
        print("1. List channels")
        print("2. Add channel")
        print("3. Delete channel")
        print("4. Count channels")
        print("5. Exit")

        choice = input("Select: ")

        if choice == "1":
            list_channels(data)

        elif choice == "2":
            add_channel(data)

        elif choice == "3":
            delete_channel(data)

        elif choice == "4":
            print("Total channels:", len(data))

        elif choice == "5":
            break

        else:
            print("Invalid choice")

if __name__ == "__main__":
    main()
