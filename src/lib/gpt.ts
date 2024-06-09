import { Email } from "@/types/propstyps";
import OpenAI from "openai";
import { toast } from "sonner";

export async function gptClassifier(emails: any, openaikey: string) {
  const OPENAI_API_KEY = openaikey || process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const emailLists: any = [];
  try {
    await Promise.all(
      emails.map(async (email: Email) => {
        const response = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `**Subject:** ${email.subject}
        
                    **Body:** ${email.body}
                    
                    **Task:** Classify this email into one of the following categories:
                    
                    * **important:** Emails that are personal or work-related and require immediate attention (e.g., "Urgent Reply Needed", "Action Required by Monday").
                    * **promotion:** Emails related to sales, discounts, and marketing campaigns (e.g., "Summer Sale", "Limited Time Offer").
                    * **social:** Emails from social networks, friends, and family (e.g., "Facebook notification", "Happy Birthday!").
                    * **marketing:** Emails related to marketing newsletters and notifications (e.g., "Company Update", "Product Announcement").
                    * **spam:** Unwanted or unsolicited emails (e.g., "Win a Free Phone", "Click Here to Unsubscribe").
                    * **general:** Emails that don't fall into any of the above categories.
                    
                    **Additional Information:**
                    
                    * Consider using regular expressions to identify specific keywords or patterns indicative of certain categories (e.g., urgency keywords for "important").
                    * The email body might contain HTML tags, which can be ignored for classification purposes.
                    
                    **Output:**
                    
                    give one word (important, promotion, social, marketing ,spam or general) answer from these options only and ignore the dash lines in the body.
        
                `,
            },
          ],
          model: "gpt-4o", //" or gpt-3.5-turbo"
          max_tokens: 1,
          temperature: 1,
          stop: ["\n"],
        });
        const decision = response.choices[0].message.content;

        emailLists.push({
          id: email.id,
          subject: email.subject,
          from: email.from,
          classification: decision || "general",
          body: email.body,
          snippet: email.snippet,
        });
      })
    );
    return emailLists;
  } catch (error) {
    toast("Internal error" + error);
  }
}
