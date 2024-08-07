import { GET } from "@/api/v2/public/app/[app_id]";
import { AppLocaliseKeys } from "@/lib/types";
import { createLocaliseCategory, createLocaliseField } from "@/lib/utils";
import { NextRequest } from "next/server";
import { getSdk as getAppMetadataSdk } from "../../../../../api/v2/public/app/[app_id]/graphql/get-app-metadata.generated";

// Mock the external dependencies
jest.mock("@/api/helpers/graphql", () => ({
  getAPIServiceGraphqlClient: jest.fn(),
}));

jest.mock(
  "../../../../../api/v2/public/app/[app_id]/graphql/get-app-metadata.generated",
  () => ({
    getSdk: jest.fn(() => ({
      GetAppMetadata: jest.fn().mockResolvedValue({
        app_metadata: [
          {
            name: "Example App",
            app_id: "1",
            logo_img_url: "logo.png",
            showcase_img_urls: ["showcase1.png", "showcase2.png"],
            hero_image_url: "hero.png",
            world_app_description:
              "This is an example app designed to showcase the capabilities of our platform.",
            world_app_button_text: "Use Integration",
            category: "Productivity",
            description:
              '{"description_overview":"fewf","description_how_it_works":"few","description_connect":"fewf"}',
            integration_url: "https://example.com/integration",
            app_website_url: "https://example.com",
            source_code_url: "https://github.com/example/app",
            whitelisted_addresses: ["0x1234", "0x5678"],
            app_mode: "mini-app",
            support_email: "andy@gmail.com",
            supported_countries: ["us"],
            supported_languages: ["en", "es"],
            app_rating: 3.4,
            app: {
              team: {
                name: "Example Team",
              },
            },
          },
        ],
      }),
    })),
  }),
);

describe("/api/public/app/[app_id]", () => {
  test("Returns correct value for valid app", async () => {
    const request = new NextRequest("https://cdn.test.com/api/public/app/1", {
      headers: {
        host: "cdn.test.com",
      },
    });
    const response = await GET(request, { params: { app_id: "1" } });
    expect(await response.json()).toEqual({
      app_data: {
        name: "Example App",
        app_id: "1",
        logo_img_url: "https://cdn.test.com/1/logo.png",
        showcase_img_urls: [
          "https://cdn.test.com/1/showcase1.png",
          "https://cdn.test.com/1/showcase2.png",
        ],
        hero_image_url: "https://cdn.test.com/1/hero.png",
        category: [
          {
            name: "Productivity",
            lokalise_key: createLocaliseCategory("Productivity"),
          },
        ],
        integration_url: "https://example.com/integration",
        app_website_url: "https://example.com",
        source_code_url: "https://github.com/example/app",
        team_name: "Example Team",
        whitelisted_addresses: ["0x1234", "0x5678"],
        app_mode: "mini-app",
        support_email: "andy@gmail.com",
        supported_countries: ["us"],
        supported_languages: ["en", "es"],
        app_rating: 3.4,
        unique_users: 0,
        description: {
          how_it_works: createLocaliseField(
            "1",
            AppLocaliseKeys.description_how_it_works,
          ),
          how_to_connect: createLocaliseField(
            "1",
            AppLocaliseKeys.description_connect,
          ),
          overview: createLocaliseField(
            "1",
            AppLocaliseKeys.description_overview,
          ),
        },
        world_app_button_text: createLocaliseField(
          "1",
          AppLocaliseKeys.world_app_button_text,
        ),
        world_app_description: createLocaliseField(
          "1",
          AppLocaliseKeys.world_app_description,
        ),
      },
    });
  });

  test("Implements native app correctly", async () => {
    const request = new NextRequest(
      "https://cdn.test.com/api/v2/public/app/TEST_APP",
      {
        headers: {
          host: "cdn.test.com",
        },
      },
    );

    jest.mocked(getAppMetadataSdk).mockImplementation(() => ({
      GetAppMetadata: jest.fn().mockResolvedValue({
        app_metadata: [
          {
            name: "Example App",
            app_id: "app_test_123",
            logo_img_url: "logo.png",
            showcase_img_urls: ["showcase1.png", "showcase2.png"],
            hero_image_url: "hero.png",
            world_app_description:
              "This is an example app designed to showcase the capabilities of our platform.",
            world_app_button_text: "Use Integration",
            category: "social",
            description:
              '{"description_overview":"fewf","description_how_it_works":"few","description_connect":"fewf"}',
            integration_url: "https://example.com/integration",
            app_website_url: "https://example.com",
            source_code_url: "https://github.com/example/app",
            whitelisted_addresses: ["0x1234", "0x5678"],
            app_mode: "mini-app",
            support_email: "andy@gmail.com",
            supported_countries: ["us"],
            supported_languages: ["en", "es"],
            app_rating: 3.4,
            app: {
              team: {
                name: "Example Team",
              },
            },
          },
        ],
      }),
    }));

    const response = await GET(request, { params: { app_id: "TEST_APP" } });
    expect(await response.json()).toEqual({
      app_data: {
        name: "Example App",
        app_id: "TEST_APP",
        logo_img_url: "https://cdn.test.com/app_test_123/logo.png",
        hero_image_url: "https://cdn.test.com/app_test_123/hero.png",
        showcase_img_urls: [
          "https://cdn.test.com/app_test_123/showcase1.png",
          "https://cdn.test.com/app_test_123/showcase2.png",
        ],
        team_name: "Example Team",
        app_mode: "native",
        integration_url: "worldapp://test",
        app_website_url: "https://example.com",
        source_code_url: "https://github.com/example/app",
        support_email: "andy@gmail.com",
        supported_countries: ["us"],
        supported_languages: ["en", "es"],
        app_rating: 3.4,
        unique_users: 0,
        whitelisted_addresses: ["0x1234", "0x5678"],
        category: [
          {
            name: "social",
            lokalise_key: "world_id_partner_category_social",
          },
        ],
        description: {
          how_it_works: createLocaliseField(
            "app_test_123",
            AppLocaliseKeys.description_how_it_works,
          ),
          how_to_connect: createLocaliseField(
            "app_test_123",
            AppLocaliseKeys.description_connect,
          ),
          overview: createLocaliseField(
            "app_test_123",
            AppLocaliseKeys.description_overview,
          ),
        },
        world_app_button_text: createLocaliseField(
          "app_test_123",
          AppLocaliseKeys.world_app_button_text,
        ),
        world_app_description: createLocaliseField(
          "app_test_123",
          AppLocaliseKeys.world_app_description,
        ),
      },
    });
  });
});
